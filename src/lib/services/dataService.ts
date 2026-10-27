import {
  Project,
  Category,
  ServiceItem,
  SiteSettings,
  Enquiry,
} from "@/types";
import {
  INITIAL_PROJECTS,
  INITIAL_CATEGORIES,
  INITIAL_SERVICES,
  INITIAL_SETTINGS,
  INITIAL_ENQUIRIES,
} from "../data/initialData";
import { isFirebaseConfigured, db, storage } from "../firebase/config";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const STORAGE_KEYS = {
  PROJECTS: "roots_projects",
  CATEGORIES: "roots_categories",
  SERVICES: "roots_services",
  SETTINGS: "roots_settings",
  ENQUIRIES: "roots_enquiries",
  TESTIMONIALS: "roots_testimonials",
};

const DATA_VERSION_KEY = "roots_data_version_v2";

// Local storage helper with automatic asset sync
const getLocal = <T>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const v = localStorage.getItem(DATA_VERSION_KEY);
    if (!v) {
      localStorage.removeItem(STORAGE_KEYS.PROJECTS);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
      localStorage.setItem(DATA_VERSION_KEY, "true");
    }
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error("Local storage read error:", e);
    return defaultValue;
  }
};

const setLocal = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Local storage write error:", e);
  }
};

/* ---------------- PROJECTS ---------------- */

export async function getPublishedProjects(): Promise<Project[]> {
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(
        collection(db, "projects"),
        where("status", "==", "published"),
        orderBy("order", "asc")
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];
      }
    } catch (err) {
      console.warn("Firestore read failed, using cached/demo data:", err);
    }
  }

  // Fallback to local storage or initial data
  const list = getLocal<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  return list
    .filter((p) => p.status === "published")
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function getAllProjects(): Promise<Project[]> {
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, "projects"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];
      }
    } catch (err) {
      console.warn("Firestore read failed, using cached/demo data:", err);
    }
  }

  return getLocal<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS).sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(
        collection(db, "projects"),
        where("slug", "==", slug)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() } as Project;
      }
    } catch (err) {
      console.warn("Firestore slug query failed, falling back to local:", err);
    }
  }

  const projects = getLocal<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  return projects.find((p) => p.slug === slug) || null;
}

export async function saveProject(
  project: Omit<Project, "id" | "createdAt" | "updatedAt"> & {
    id?: string;
    createdAt?: number;
    updatedAt?: number;
  }
): Promise<Project> {
  const id = project.id || `proj-${Date.now()}`;
  const now = Date.now();
  
  const projectData: Project = {
    ...project,
    id,
    createdAt: project.createdAt || now,
    updatedAt: now,
    isDemo: project.isDemo ?? false,
  };

  if (isFirebaseConfigured() && db) {
    try {
      await setDoc(doc(db, "projects", id), projectData, { merge: true });
    } catch (err) {
      console.error("Firestore save project error:", err);
    }
  }

  // Always update local storage
  const projects = getLocal<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  const index = projects.findIndex((p) => p.id === id);
  if (index >= 0) {
    projects[index] = projectData;
  } else {
    projects.push(projectData);
  }
  setLocal(STORAGE_KEYS.PROJECTS, projects);

  return projectData;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (isFirebaseConfigured() && db) {
    try {
      await deleteDoc(doc(db, "projects", id));
    } catch (err) {
      console.error("Firestore delete project error:", err);
    }
  }

  const projects = getLocal<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  const updated = projects.filter((p) => p.id !== id);
  setLocal(STORAGE_KEYS.PROJECTS, updated);
  return true;
}

/* ---------------- CATEGORIES ---------------- */

export async function getCategories(): Promise<Category[]> {
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, "categories"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Category[];
      }
    } catch (err) {
      console.warn("Firestore categories error, using fallback:", err);
    }
  }
  return getLocal<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
}

export async function saveCategories(categories: Category[]): Promise<void> {
  if (isFirebaseConfigured() && db) {
    try {
      for (const cat of categories) {
        await setDoc(doc(db, "categories", cat.id), cat);
      }
    } catch (err) {
      console.error("Firestore save categories error:", err);
    }
  }
  setLocal(STORAGE_KEYS.CATEGORIES, categories);
}

/* ---------------- SERVICES ---------------- */

export async function getServices(): Promise<ServiceItem[]> {
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, "services"), orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as ServiceItem[];
      }
    } catch (err) {
      console.warn("Firestore services error, using fallback:", err);
    }
  }
  return getLocal<ServiceItem[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
}

export async function saveServices(services: ServiceItem[]): Promise<void> {
  if (isFirebaseConfigured() && db) {
    try {
      for (const s of services) {
        await setDoc(doc(db, "services", s.id), s);
      }
    } catch (err) {
      console.error("Firestore save services error:", err);
    }
  }
  setLocal(STORAGE_KEYS.SERVICES, services);
}

/* ---------------- SITE SETTINGS ---------------- */

export async function getSiteSettings(): Promise<SiteSettings> {
  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, "siteSettings", "general");
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return snap.data() as SiteSettings;
      }
    } catch (err) {
      console.warn("Firestore settings error, using fallback:", err);
    }
  }
  return getLocal<SiteSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
}

export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const updated: SiteSettings = {
    ...current,
    ...settings,
    updatedAt: Date.now(),
  };

  if (isFirebaseConfigured() && db) {
    try {
      await setDoc(doc(db, "siteSettings", "general"), updated, { merge: true });
    } catch (err) {
      console.error("Firestore update settings error:", err);
    }
  }

  setLocal(STORAGE_KEYS.SETTINGS, updated);
  return updated;
}

/* ---------------- ENQUIRIES ---------------- */

export async function submitEnquiry(
  enquiryData: Omit<Enquiry, "id" | "status" | "createdAt">
): Promise<Enquiry> {
  const newEnquiry: Enquiry = {
    ...enquiryData,
    id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    status: "New",
    createdAt: Date.now(),
  };

  if (isFirebaseConfigured() && db) {
    try {
      await setDoc(doc(db, "enquiries", newEnquiry.id), newEnquiry);
    } catch (err) {
      console.error("Firestore submit enquiry error:", err);
    }
  }

  // Update local storage
  const enquiries = getLocal<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  enquiries.unshift(newEnquiry);
  setLocal(STORAGE_KEYS.ENQUIRIES, enquiries);

  return newEnquiry;
}

export async function getAllEnquiries(): Promise<Enquiry[]> {
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as Enquiry[];
      }
    } catch (err) {
      console.warn("Firestore enquiries fetch error:", err);
    }
  }
  return getLocal<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES).sort(
    (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
  );
}

export async function updateEnquiryStatus(
  id: string,
  status: Enquiry["status"],
  internalNotes?: string
): Promise<boolean> {
  const updatePayload: Partial<Enquiry> = {
    status,
    updatedAt: Date.now(),
  };
  if (internalNotes !== undefined) {
    updatePayload.internalNotes = internalNotes;
  }

  if (isFirebaseConfigured() && db) {
    try {
      await updateDoc(doc(db, "enquiries", id), updatePayload);
    } catch (err) {
      console.error("Firestore update enquiry error:", err);
    }
  }

  const enquiries = getLocal<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  const index = enquiries.findIndex((e) => e.id === id);
  if (index >= 0) {
    enquiries[index] = { ...enquiries[index], ...updatePayload };
    setLocal(STORAGE_KEYS.ENQUIRIES, enquiries);
    return true;
  }
  return false;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  if (isFirebaseConfigured() && db) {
    try {
      await deleteDoc(doc(db, "enquiries", id));
    } catch (err) {
      console.error("Firestore delete enquiry error:", err);
    }
  }

  const enquiries = getLocal<Enquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  const updated = enquiries.filter((e) => e.id !== id);
  setLocal(STORAGE_KEYS.ENQUIRIES, updated);
  return true;
}

/* ---------------- IMAGE UPLOAD ---------------- */

export async function uploadImageFile(file: File, folder: string = "projects"): Promise<string> {
  // Validate file type
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are permitted.");
  }

  // Validate file size (10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("Image file exceeds the 10MB limit.");
  }

  if (isFirebaseConfigured() && storage) {
    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
      const storageRef = ref(storage, `${folder}/${Date.now()}_${cleanFileName}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(uploadResult.ref);
      return downloadUrl;
    } catch (err) {
      console.warn("Firebase Storage upload failed, falling back to local object URL:", err);
    }
  }

  // Local fallback: Return a base64 or object URL for client preview/storage
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

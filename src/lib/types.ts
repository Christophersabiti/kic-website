export interface Member {
  id: string;
  name: string;
  role: string;
  photo: string;
  quote: string;
  bio: string;
  testimony: string;
  story: string;
  joinDate: string;
  social: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    email?: string;
    phone?: string;
    website?: string;
  };
}

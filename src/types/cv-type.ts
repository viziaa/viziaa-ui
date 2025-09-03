export interface ExperienceItem {
  id: string;
  corporate: string;
  date_in: Date;
  date_out: Date;
  isDraft?: false | true;
}

export interface UserItem {
  id: string;
  email: string;
  nickname: string;
  fullname: string;
  address: string;
  city: string;
  region: string;
  birthdate: Date;
  phone: string;
  about: string;
  avatar: string;
}

export interface AdditionItem {
  id: number;
  question: string;
  answer: string;
}

export interface EducationItem {
  id: string;
  education_level: string;
  school_name: string;
  school_address: string;
  date_in: Date;
  date_out: Date;
  isDraft?: false | true;
}

export interface SkillItem {
  id: string;
  skill_name: string;
  ability_level: string;
  certificate: string;
  certified: boolean;
  isDraft?: false | true;
}

export interface CVPageProps {
  id: string;
  name: string;
  font: string;
  color: string;
  user: UserItem;
  education: EducationItem[];
  work_experiences: ExperienceItem[];
  skills: SkillItem[];
  additions: AdditionItem[];
}

export interface AdditionsProps {
  cvData: CVPageProps;
  setAdditionData: ({ id, question, answer }: AdditionItem) => void;
  setCvData: React.Dispatch<React.SetStateAction<CVPageProps>>;
}

export interface EducationProps {
  cvData: CVPageProps;
  setEducationData: ({
    id,
    education_level,
    school_name,
    school_address,
    date_in,
    date_out,
  }: EducationItem) => void;
  setCvData: React.Dispatch<React.SetStateAction<CVPageProps>>;
}

export interface SkillProps {
  cvData: CVPageProps;
  setSkillData: ({
    id,
    skill_name,
    ability_level,
    certificate,
    certified,
  }: SkillItem) => void;
  setCvData: React.Dispatch<React.SetStateAction<CVPageProps>>;
}

export interface ExperienceProps {
  cvData: CVPageProps;
  setExperiencesData: ({
    id,
    corporate,
    date_in,
    date_out,
  }: ExperienceItem) => void;
  setCvData: React.Dispatch<React.SetStateAction<CVPageProps>>;
}

export interface UserProps {
  cvData: CVPageProps;
  setUserData: ({
    id,
    email,
    nickname,
    fullname,
    address,
    city,
    region,
    birthdate,
    phone,
    about,
    avatar,
  }: UserItem) => void;
  setCvData: React.Dispatch<React.SetStateAction<CVPageProps>>;
}

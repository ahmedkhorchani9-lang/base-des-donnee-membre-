export interface Trainer {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  grade: 'Trainer' | 'Prime' | 'CNT' | 'CNT-I' | 'Fellow';
  domain: 'Individual' | 'Community' | 'International' | 'Business' | 'Coaching';
  localOrg: string;
  joinDate: string;
  avatar: string;
  engagementScore: number;
  skills: string[];
  location: string;
  lastActive: string;
  bio: string;
}

const grades = ['Trainer', 'Prime', 'CNT', 'CNT-I', 'Fellow'];
const domains = ['Individual', 'Community', 'International', 'Business', 'Coaching'];
const localOrgs = ['JCI Tunis', 'JCI Ariana', 'JCI Carthage', 'JCI Megrine', 'JCI Bizerte', 'JCI Sousse', 'JCI Monastir', 'JCI Sfax'];
const skillsPool = ['Conflict Resolution', 'Public Speaking', 'Digital Marketing', 'Project Management', 'Emotional Intelligence', 'Team Building', 'Strategic Planning', 'Fundraising'];
const locations = ['Tunis, Tunisia', 'Sousse, Tunisia', 'Sfax, Tunisia', 'Bizerte, Tunisia', 'Remote'];

export const generateTrainers = (count: number): Trainer[] => {
  return Array.from({ length: count }).map((_, i) => {
    const grade = grades[Math.floor(Math.random() * grades.length)] as any;
    const domain = domains[Math.floor(Math.random() * domains.length)] as any;
    const localOrg = localOrgs[Math.floor(Math.random() * localOrgs.length)];
    const engagementScore = Math.floor(Math.random() * 100);
    const joinDate = new Date(Date.now() - Math.random() * 31536000000 * 5).toISOString().split('T')[0];
    const lastActive = new Date(Date.now() - Math.random() * 86400000 * 30).toISOString();
    
    // Generate Tunisian-style phone number: +216 XX XXX XXX
    const phonePrefix = ['2', '4', '5', '9'][Math.floor(Math.random() * 4)];
    const phoneRest = Math.floor(1000000 + Math.random() * 9000000).toString().substring(0, 7);
    const phoneNumber = `+216 ${phonePrefix}${phoneRest.substring(0, 1)} ${phoneRest.substring(1, 4)} ${phoneRest.substring(4, 7)}`;

    return {
      id: `t-${i + 1}`,
      name: `Trainer ${i + 1}`,
      email: `trainer${i + 1}@jci.org.tn`,
      phoneNumber,
      grade,
      domain,
      localOrg,
      joinDate,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 500}`,
      engagementScore,
      skills: skillsPool.sort(() => 0.5 - Math.random()).slice(0, 3),
      location: locations[Math.floor(Math.random() * locations.length)],
      lastActive,
      bio: `Professional ${grade.toLowerCase()} specializing in ${domain.toLowerCase()} development. Active member of ${localOrg}.`
    };
  });
};

export const MOCK_TRAINERS = generateTrainers(24);

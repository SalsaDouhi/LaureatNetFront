export interface DashboardDTO {
  total: {
    normalPost: number;
    internshipOffer: number;
    jobOffer: number;
    scientificArticle: number;
  };

  yearlyChart: number[];

  yearly: number;
  monthly: number;

  totalUsers: number;
  usersPerMonth: number[];
}

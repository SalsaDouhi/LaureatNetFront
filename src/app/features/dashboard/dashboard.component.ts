import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DashboardDTO } from '../../shared/interfaces/DashboardDTO';
import ApexCharts from 'apexcharts';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  dashboard: DashboardDTO = {
    total: {
      normalPost: 1534,
      internshipOffer: 260,
      jobOffer: 98,
      scientificArticle: 55,
    },

    yearlyChart: [17, 10, 45, 15, 25, 15, 40, 10, 24, 5, 6, 3],

    yearly: 2087,
    monthly: 155,

    totalUsers: 1500,
    usersPerMonth: [8, 10, 25, 18, 38, 24, 20, 16, 7, 5, 6, 7],
  } as DashboardDTO;

  yearlyChart: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        console.log(data);
        this.dashboard = data;
        setTimeout(() => {
          this.showYearlyStats();
          this.showUsersChart();
        }, 0);
      },
      error: (error) => {
        console.log(`error getting dashboard data: `, error);
      },
    });
    
  }

  showYearlyStats() {
    var yearlyChartOptions = {
      series: [
        // {
        //   name: 'Movies',
        //   data: this.watchCount.movies,
        // },

        {
          name: 'Postes',
          data: this.dashboard.yearlyChart,
          // data: [17, 10, 45, 15, 25, 15, 40, 10, 24, 5, 6, 3],
        },
      ],
      chart: {
        //width:150,
        foreColor: '#9ba7b2',
        height: 235,
        type: 'bar',
        toolbar: {
          show: !1,
        },
        sparkline: {
          enabled: !1,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 4,
        curve: 'smooth',
        colors: ['transparent'],
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#0d6efd', '#6f42c1'],
          shadeIntensity: 1,
          type: 'vertical',
          // opacityFrom: 0.8,
          // opacityTo: 0.1,
          stops: [0, 100, 100, 100],
        },
      },
      colors: ['#0d6efd', '#6f42c1'],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 0,
          borderRadiusApplication: 'around',
          borderRadiusWhenStacked: 'last',
          columnWidth: '55%',
        },
      },
      grid: {
        show: false,
        borderColor: 'rgba(0, 0, 0, 0.15)',
        strokeDashArray: 4,
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: !0,
        },
        x: {
          show: !0,
        },
        y: {
          title: 'dd',
        },
        marker: {
          show: !1,
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    };

    if (this.yearlyChart) {
      this.yearlyChart.destroy(); // Destroy the existing chart instance if it exists
    }

    if (document.querySelector('#yearlyChart')) {
      console.log('found');
    }
    this.yearlyChart = new ApexCharts(
      document.querySelector('#yearlyChart'),
      yearlyChartOptions
    );

    this.yearlyChart.render();
  }

  showUsersChart() {
    var options = {
      series: [
        {
          name: "Nombre totale d'utilisateurs",
          data: this.dashboard.usersPerMonth,
        },
      ],
      chart: {
        //width:150,
        height: 120,
        type: 'bar',
        sparkline: {
          enabled: !0,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
        curve: 'smooth',
        color: ['transparent'],
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#fc6718'],
          shadeIntensity: 1,
          type: 'vertical',
          //opacityFrom: 0.8,
          //opacityTo: 0.1,
          //stops: [0, 100, 100, 100]
        },
      },
      colors: ['#fc185a'],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4,
          borderRadiusApplication: 'around',
          borderRadiusWhenStacked: 'last',
          columnWidth: '45%',
        },
      },

      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: !1,
        },
        x: {
          show: !1,
        },
        y: {
          title: {},
        },
        marker: {
          show: !1,
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    };

    var chart = new ApexCharts(document.querySelector('#usersChart'), options);
    chart.render();
  }
}

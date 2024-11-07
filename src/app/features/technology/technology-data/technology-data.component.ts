import { Component, OnInit } from '@angular/core';
import { Technology } from '../../../shared/interfaces/Technology';
import { TechnologyDataService } from '../../../core/services/technologyData.service';
import { MatDialog } from '@angular/material/dialog';
import { TechnologyEditModalComponent } from '../technology-edit-modal/technology-edit-modal.component';

@Component({
  selector: 'app-technology-data',
  templateUrl: './technology-data.component.html',
  styleUrl: './technology-data.component.css',
})
export class TechnologyDataComponent implements OnInit {
  technologies: Technology[] = [];
  technologiesToShow: Technology[] = [];

  constructor(
    private technologyService: TechnologyDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.technologyService.getAllTechnologies().subscribe({
      next: (tech) => {
        this.technologies = tech;
        this.technologiesToShow = this.technologies;
      },
      error: (error) => console.log(error),
    });
  }

  doShowAddButton(input: HTMLInputElement) {
    const formatedName = input.value.trim().toLocaleLowerCase();
    let found = false;

    if (formatedName == '') return true;

    for (const techno of this.technologies) {
      if (techno.title.toString().trim().toLowerCase().toString() == formatedName) {
        found = true;
        break;
      }
    }

    return found;
  }

  doFilter(input: HTMLInputElement) {
    this.technologiesToShow = this.technologies;

    const formatedName = input.value.trim().toLocaleLowerCase();
    if (formatedName == '') return;
    this.technologiesToShow = [];

    for (const techno of this.technologies) {
      if (
        techno.title
          .trim()
          .toLocaleLowerCase()
          .toString()
          .includes(formatedName)
      ) {
        this.technologiesToShow.push(techno);
      }
    }
  }

  onSubmit(input: HTMLInputElement) {
    // if (this.technologiesToShow.length != 0) return;

    let tech = {} as Technology;
    tech.title = input.value;

    this.technologyService.createTechnology(tech).subscribe({
      next: (x) => {
        this.technologies.push(x);
        // input.value = '';
        input.value = '';
        this.doFilter(input); // filter again after adding the new technology
      },
      error: (error) => console.log(error),
    });
  }

  openEditModal(technology: Technology) {
    const dialogRef = this.dialog.open(TechnologyEditModalComponent, {
      width: '600px',
      height: 'auto',
      data: {
        title: technology.title,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.delete) {
          this.technologyService.deleteTechnology(technology.id!).subscribe({
            next: () => {
              for (let i = 0; i < this.technologies.length; i++) {
                if (this.technologies[i].id == technology.id) {
                  this.technologies.splice(i, 1);
                  this.technologiesToShow = this.technologies;
                }
              }
            },
            error: (error) => {
              console.log(`error modifying technology: `, error);
            },
          });
        } else if (result.title && result.title != technology.title) {
          technology.title = result.title;
          this.technologyService.updateTechnology(technology).subscribe({
            next: (tech) => {
              for (const techno of this.technologies) {
                if (techno.id == tech.id) {
                  techno.title = techno.title;
                  this.technologiesToShow = this.technologies;
                }
              }
            },
            error: (error) => {
              console.log(`error modifying technology: `, error);
            },
          });
        }
      }
      console.log(result);
    });
  }
}

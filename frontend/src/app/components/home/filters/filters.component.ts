import { Component, OnInit, Input } from "@angular/core";
import { Paging } from "src/app/models/paging";
import { Category } from "src/app/models/Category";
import { Department } from "src/app/models/department";
import { CategoryService } from "src/app/services/Category/category.service";
import { DepartmentService } from "src/app/services/Department/department.service";
import { ProductListComponent } from "../product-list/product-list.component";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"],
})
export class FiltersComponent implements OnInit {
  //defintion epartlsit varaible
  departmentList: Department[];

  //defintion categoryList varaible
  categoryList: Category[];

  //defintion filteredCategoryList varaible
  filteredCategoryList: Category[];

  //defintion selectedDepartment varaible
  selectedDepartment: number;

  //defintion selectedCategory varaible
  selectedCategory: number;

  //defintion searchString varaible
  searchString: string;

  //defintion searchForAllWords varaible
  searchForAllWords: boolean;

  @Input() productList: ProductListComponent;

  constructor(
    private departmentService: DepartmentService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    //getting category list
    this.getCategoryList();
    //getiing depart list
    this.getDepartmenstList();
    //intializinf department
    this.selectedDepartment = 0;
    //initizaling category
    this.selectedCategory = 0;
    //initali word search
    this.searchForAllWords = false;
  }

  getDepartmenstList() {
    //calling depart service to get deaprtt
    this.departmentService.getDepartments().subscribe((a) => {
      //get all depart
      this.departmentList = a as Department[];

      let allDep: Department = new Department();
      allDep.DepartmentId = 0;
      allDep.Name = "All Departments";
      //push deaprtment to departlist
      this.departmentList.push(allDep);

      //cllaing category by id department
      this.getCategoriesByDepartmentId();
    });
  }

  getCategoryList() {
    //calleing category service to get category
    this.categoryService.getCategories().subscribe((a) => {
      ///padssing category to categorylist
      this.categoryList = a as Category[];
    });
  }

  getCategoriesByDepartmentId() {
    //filltering categroy on the basis of department
    this.filteredCategoryList = this.categoryList.filter(
      (a) => a.DepartmentId == this.selectedDepartment
    );
    //check if depart is presenor not
    if (this.selectedDepartment == 0) {
      this.filteredCategoryList = this.categoryList;
    }
  }

  onSelectDepartment(department) {
    this.selectedDepartment = department.DepartmentId;
    this.selectedCategory = 0;
    this.getCategoriesByDepartmentId();
    let filter: Paging = new Paging();
    filter.DepartmentId = this.selectedDepartment;
    filter.DepartmentName = this.departmentList.filter(
      (a) => a.DepartmentId == this.selectedDepartment
    )[0].Name;
    filter.CategoryId = this.selectedCategory;
    filter.CategoryName =
      this.selectedCategory == 0
        ? ""
        : this.categoryList.filter(
            (a) => a.DepartmentId == this.selectedCategory
          )[0].Name;
    filter.SearchString = this.searchString;
    filter.IsAllWords = this.searchForAllWords;
    this.productList.setFilters(filter);
  }

  onSelectCategory(category) {
    this.selectedCategory = category.CategoryId;
    let filter: Paging = new Paging();
    filter.DepartmentId = this.selectedDepartment;
    filter.DepartmentName = this.departmentList.filter(
      (a) => a.DepartmentId == this.selectedDepartment
    )[0].Name;
    filter.CategoryId = this.selectedCategory;
    filter.CategoryName =
      this.selectedCategory == 0
        ? ""
        : this.categoryList.filter(
            (a) => a.DepartmentId == this.selectedCategory
          )[0].Name;
    filter.SearchString = this.searchString;
    filter.IsAllWords = this.searchForAllWords;
    this.productList.setFilters(filter);
  }

  onClickSearch() {
    let filter: Paging = new Paging();
    filter.DepartmentId = this.selectedDepartment;
    filter.DepartmentName = this.departmentList.filter(
      (a) => a.DepartmentId == this.selectedDepartment
    )[0].Name;
    filter.CategoryId = this.selectedCategory;
    filter.CategoryName =
      this.selectedCategory == 0
        ? ""
        : this.categoryList.filter(
            (a) => a.DepartmentId == this.selectedCategory
          )[0].Name;
    filter.SearchString = this.searchString;
    filter.IsAllWords = this.searchForAllWords;
    this.productList.setFilters(filter);
  }
}

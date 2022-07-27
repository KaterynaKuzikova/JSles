
class Student{
  constructor(fullname, marks){
    this.fullname = fullname;
    this.marks = marks;
  }
  fullInfo(){
    return this.fullname + ',' + this.marks;
  } 
}
class Group extends Student{
    constructor(stArr){
        super();
        this.stArr = [];
    }
    addStudent(Student){
        return this.stArr.push(Student);
    }

    getAverageMark(stArr){
            return (this.students.reduce((acc, el) => {
                acc+= (el.marks.reduce((acc, e) => {
                acc += e
                return acc;
            }, 0))/ el.marks.length          
                return acc;
            }, 0)/this.students.length);  
    }

    get students(){
        return this.stArr;
    }

}




const feGroup = new Group();
const firstStudent = new Student('John Doe', [10, 102, 0]);
console.log(firstStudent);
feGroup.addStudent( new Student('John Doe', [10, 10, 5, 10]));
feGroup.addStudent(new Student('Alex Smith', [10, 9, 8]));
feGroup.addStudent(new Student('Bob Johnson', [9, 10, 10, 8]));
console.log(feGroup);

console.log(feGroup.students); // [{},{},{}]
console.log(feGroup.getAverageMark()); // 20

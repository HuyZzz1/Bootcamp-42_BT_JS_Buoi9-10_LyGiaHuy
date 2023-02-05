function Staff(
  account,
  name,
  email,
  password,
  workingDay,
  basicSalary,
  position,
  workTime
) {
  this.account = account;
  this.name = name;
  this.email = email;
  this.password = password;
  this.workingDay = workingDay;
  this.basicSalary = basicSalary;
  this.position = position;
  this.workTime = workTime;
}

Staff.prototype.calcSalary = function () {
  if (this.position === "Giám đốc")
    return (this.basicSalary * 3).toLocaleString();
  if (this.position === "Trưởng phòng")
    return (this.basicSalary * 2).toLocaleString();
  if (this.position === "Nhân viên") return this.basicSalary.toLocaleString();
};

Staff.prototype.rankings = function () {
  if (this.position === "Nhân viên") {
    if (this.workTime >= 192) {
      return "Nhân viên xuất sắc";
    } else if (this.workTime >= 176) {
      return "Nhân viên giỏi";
    } else if (this.workTime >= 160) {
      return "Nhân viên khá";
    } else {
      return "Nhân viên trung bình";
    }
  } else {
    return "";
  }
};

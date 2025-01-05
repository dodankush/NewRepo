namespace EmployeeManagementSystem.Models
{
    public class Employee
    {
        public int Id { get; set; }
     
        public string Name { get; set; }
        public string Designation { get; set; }       
        public DateTime DateOfBirth { get; set; }
        public string ContactNo { get; set; }

        public DateTime DateOfJoining { get; set; }

        public string SkillSet { get; set; }

    }
}

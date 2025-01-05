using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);
        Task Register(User user);
    }
}

using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Repositories
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string username, string password);
        Task Register(User user);
    }
}

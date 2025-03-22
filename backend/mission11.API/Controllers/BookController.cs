using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mission11.API.Data;

namespace mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookContext _context;
        public BookController(BookContext context)
        {
            _context = context;
        }

      [HttpGet]
public IActionResult GetBooks(int pageHowMany = 10, int pageNum = 1, string sortBy = "title", string sortOrder = "asc") 
{
    var query = _context.Books.AsQueryable();

    // Sorting logic
    if (sortBy.ToLower() == "title")
    {
        query = sortOrder.ToLower() == "desc" ? query.OrderByDescending(b => b.Title) : query.OrderBy(b => b.Title);
    }

    var books = query
        .Skip((pageNum - 1) * pageHowMany)
        .Take(pageHowMany)
        .ToList();

    var totalNumBooks = _context.Books.Count();

    return Ok(new
    {
        Books = books,
        TotalNumBooks = totalNumBooks
    });
}


    }

}

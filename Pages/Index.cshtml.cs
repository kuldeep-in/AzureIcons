using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AzureIcons.Web.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        public List<string> Folders { get; set; }

        public IActionResult OnGet()
        {
            Folders = GetFoldersList();
            return Page();
        }

        public IActionResult OnGetGetFolders()
        {
            return new JsonResult(GetFoldersList());
        }

        public IActionResult OnGetGetSvgFiles(string folder)
        {
            var svgFiles = GetSvgFilesForFolder(folder);
            return new JsonResult(svgFiles);
        }

        private List<string> GetFoldersList()
        {
            var wwwrootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Azure_Public_Service_Icons_V15/Icons");
            return Directory.GetDirectories(wwwrootPath)
                            .Select(dir => Path.GetFileName(dir))
                            .ToList();
        }

        private List<string> GetSvgFilesForFolder(string folder)
        {
            var wwwrootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Azure_Public_Service_Icons_V15/Icons");
            var folderPath = Path.Combine(wwwrootPath, folder);
            return Directory.GetFiles(folderPath, "*.*")
                            .Select(file => Path.GetFileName(file))
                            .ToList();
        }
    }
}
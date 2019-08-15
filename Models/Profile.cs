using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;


namespace dotnetProfile.Models
{
    public class Profile
    {
        [Key]
        public string userID { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public string Location { get; set; }
        public string Specialty { get; set; }
        public int Count { get; set; }
    }
}

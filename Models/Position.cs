using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetProfile.Models
{
    public class Position
    {
        public string userID { get; set; }
        public string Title { get; set; }
        public string Workplace { get; set; }
        public string Location { get; set; }
        [Key]
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Detail { get; set; }
        public string Image { get; set; }
    }
}

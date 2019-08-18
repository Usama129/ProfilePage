using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetProfile.Models
{
    public class Position
    {
        [Key]
        public int ID { get; set; }
        public string userID { get; set; }
        public string Title { get; set; }
        public string Workplace { get; set; }
        public string Location { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Detail { get; set; }
        public string Image { get; set; }
        public string Type { get; set; }
    }
}

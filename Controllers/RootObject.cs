using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetProfile.Models;

namespace dotnetProfile.Controllers
{
    public class RootObject
    {
        public Profile[] Profiles { get; set; }
    }
}

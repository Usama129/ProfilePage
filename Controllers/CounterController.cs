using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using dotnetProfile.Data;
using Newtonsoft.Json;
using dotnetProfile.Models;
using TypeMerger;

namespace dotnetProfile.Controllers
{   
   
    [ApiController]
    public class CounterController : ControllerBase
    {
        private ApplicationDbContext _db;

        public CounterController(ApplicationDbContext db) {
            _db = db;
        }

        
        [HttpGet]
        [Route("api/user/{userID}")]
        public Profile getUser(String userID)
        {
            return _db.userProfiles.Find(userID);
            
        }

       
        [HttpPost]
        [Route("api/user/set")]
        public int setUser([FromBody]Profile p)
        {
            var entry = _db.userProfiles.Find(p.userID);
            if (p.Name != null)
                entry.Name = p.Name;
            if (p.Title != null)
                entry.Title = p.Title;
            if (p.Location != null)
                entry.Location = p.Location;
            if (p.Specialty != null)
                entry.Specialty = p.Specialty;
            _db.userProfiles.Update(entry);
            _db.SaveChanges();
            return 1;
        }

       
        [HttpGet]
        [Route("api/user/{userID}/positions/{type}")]
        public IEnumerable<Position> getUserPositions(string userID, string type)
        {
            if (type == "exp")
                return _db.Positions.Where(x => x.userID == userID && x.Type == "Experience").ToList();
            if (type == "edu")
                return _db.Positions.Where(x => x.userID == userID && x.Type == "Education").ToList();
            else
                return null;
        }

        [HttpPost]
        [Route("api/user/setposition")]
        public int setPosition([FromBody]Position p)
        {
            var entry = _db.Positions.Find(p.ID);
            entry.Title = p.Title;
            entry.Workplace = p.Workplace;
            entry.Location = p.Location;
            entry.StartTime = p.StartTime;
            entry.EndTime = p.EndTime;
            entry.Detail = p.Detail;
            _db.Positions.Update(entry);
            _db.SaveChanges();
            return 1;
        }


        [HttpPost]
        [Route("api/user/deleteposition")]
        public int deletePosition([FromBody]Position p) {
            var entry = _db.Positions.Find(p.ID);
            _db.Positions.Remove(entry);
            _db.SaveChanges();
            return 1;
        }

        [HttpPost]
        [Route("api/user/addposition")]
        public int addPosition([FromBody]Position p)
        {
            _db.Positions.Add(p);
            _db.SaveChanges();
            return 1;
        }

        [HttpPost]
        [Route("api/user/setcount")]
        public int setCount([FromBody]Profile p)
        {
            var entry = _db.userProfiles.Find(p.userID);
            entry.Count = p.Count;
            _db.userProfiles.Update(entry);
            _db.SaveChanges();
            return 1;
        }
    }
}
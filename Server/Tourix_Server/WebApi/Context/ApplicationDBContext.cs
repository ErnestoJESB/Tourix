﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Context
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions options): base(options) { }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Rol> Roles { get; set; }
    }
}
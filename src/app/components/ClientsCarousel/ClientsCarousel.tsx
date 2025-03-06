import React from 'react';

function ClientsCarousel() {
  const clients = [
    'IPG',
    'Publicis Groupe',
    'Omnicom Group Inc.',
    'WPP plc',
    'Dentsu Group Inc.',
    'Havas Group',
    'Ogilvy',
    'Saatchi & Saatchi',
    'Droga5',
    'TBWA\\Worldwide',
    'BBDO Worldwide',
    'Leo Burnett',
    'Grey Group',
    'VMLY&R',
    'McCann Worldgroup',
    'AKQA',
    'Weber Shandwick',
    'FCB Global',
    'Hill+Knowlton Strategies',
    'Geometry Global',
    'R/GA',
    'Cheil Worldwide',
    'Isobar',
    'Edelman',
    'BlueFocus Communication Group',
  ];

  return (
    <section id="clients" className=" grid gap-2 p-6 bg-zinc-900 text-zinc-100">
      <h2 className="text-2xl font-bold text-zinc-300 text-center">
        My Clients
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {clients.map((client, index) => (
          <div key={index} className="flex justify-center items-center">
            <span className="bg-zinc-800 text-zinc-300 text-sm font-medium px-4 py-2 rounded-full text-center">
              {client}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ClientsCarousel;

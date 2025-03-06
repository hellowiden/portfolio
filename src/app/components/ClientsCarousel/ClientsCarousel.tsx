import React from 'react';

function ClientsCarousel() {
  // Array of client names
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
    <section id="clients" className="p-6">
      <h2 className="text-2xl font-bold">Our Clients</h2>
      <div className="grid grid-cols-2 gap-2">
        {clients.map((client, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-2 rounded-full text-center"
          >
            {client}
          </span>
        ))}
      </div>
    </section>
  );
}

export default ClientsCarousel;

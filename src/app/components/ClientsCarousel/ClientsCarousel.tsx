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
    <section
      id="clients"
      className="grid place-items-center p-6 gap-6 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-3  bg-white dark:bg-zinc-800  w-full ">
        {clients.map((client, index) => (
          <div
            key={index}
            className="p-4 bg-white dark:bg-zinc-700 border dark:border-dark text-center"
          >
            <span className="text-base font-medium">{client}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ClientsCarousel;

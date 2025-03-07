import React from 'react';

function ClientsCarousel() {
  const clients = [
    { name: 'IPG', url: 'https://www.interpublic.com/' },
    { name: 'Publicis Groupe', url: 'https://www.publicisgroupe.com/' },
    { name: 'Omnicom Group Inc.', url: 'https://www.omnicomgroup.com/' },
    { name: 'WPP plc', url: 'https://www.wpp.com/' },
    { name: 'Dentsu Group Inc.', url: 'https://www.dentsu.com/' },
    { name: 'Havas Group', url: 'https://www.havasgroup.com/' },
    { name: 'Ogilvy', url: 'https://www.ogilvy.com/' },
    { name: 'Saatchi & Saatchi', url: 'https://www.saatchi.com/' },
    { name: 'Droga5', url: 'https://droga5.com/' },
    { name: 'TBWA\\Worldwide', url: 'https://www.tbwa.com/' },
    { name: 'BBDO Worldwide', url: 'https://www.bbdo.com/' },
    { name: 'Grey Group', url: 'https://www.grey.com/' },
    { name: 'VMLY&R', url: 'https://www.vmlyr.com/' },
    { name: 'McCann Worldgroup', url: 'https://www.mccannworldgroup.com/' },
    { name: 'AKQA', url: 'https://www.akqa.com/' },
    { name: 'Weber Shandwick', url: 'https://www.webershandwick.com/' },
    { name: 'FCB Global', url: 'https://www.fcb.com/' },
    { name: 'Hill+Knowlton Strategies', url: 'https://www.hkstrategies.com/' },
    { name: 'Geometry Global', url: 'https://www.geometry.com/' },
    { name: 'R/GA', url: 'https://www.rga.com/' },
    { name: 'Cheil Worldwide', url: 'https://www.cheil.com/' },
    { name: 'Isobar', url: 'https://www.isobar.com/' },
    { name: 'Edelman', url: 'https://www.edelman.com/' },
    {
      name: 'BlueFocus Communication Group',
      url: 'https://www.bluefocus.net/',
    },
  ];

  return (
    <section
      id="clients"
      className="grid place-items-center p-6 gap-6 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 bg-white dark:bg-zinc-800 w-full">
        {clients.map((client, index) => (
          <div
            key={index}
            className="p-4 bg-white dark:bg-zinc-700 border dark:border-dark text-center"
          >
            <a
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className=" text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition "
            >
              {client.name}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ClientsCarousel;

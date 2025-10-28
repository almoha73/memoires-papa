export default function Home() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      

      <div className="text-center mb-12">
        <h2 className="text-5xl font-serif-handwritten text-color-1 mb-4">
          L'histoire d'une vie
        </h2>
        <p className="text-2xl text-color-2 font-light">
          Mémoires de Philippe Beaumatin
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-color-1 mb-4">Bienvenue</h3>
          <p className="text-color-2 mb-4">
            Découvrez l'histoire fascinante de Philippe Beaumatin à travers deux sections :
          </p>
          <ul className="list-disc list-inside space-y-3 text-color-2">
            <li>
              <strong className="text-color-1">Chronologie :</strong> Une vue d'ensemble des événements marquants de sa vie, présentés de manière interactive et chronologique.
            </li>
            <li>
              <strong className="text-color-1">Mémoires :</strong> Le récit complet et détaillé de ses souvenirs, enrichi de photographies et de documents d'époque.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

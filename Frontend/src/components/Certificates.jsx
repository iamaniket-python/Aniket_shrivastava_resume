import '../css/Certificates.css';

function Certificates({ certificates }) {
  return (
    <section id="certificates">
      <div className="wrap">
        <h2>Certificates</h2>
        <div className="cert-grid">
          {certificates.map((cert) => (
            <div className="cert-card" key={cert.id}>
              <div className="cert-icon">🏅</div>
              <div>
                <div className="cert-name">{cert.name}</div>
                <div className="cert-issuer">{cert.issuer}</div>
                <div className="cert-date">{cert.date}</div>
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="cert-link">View credential ↗</a>
                )}
              </div>
            </div>
          ))}
          {certificates.length === 0 && <p>No certificates added yet.</p>}
        </div>
      </div>
    </section>
  );
}

export default Certificates;
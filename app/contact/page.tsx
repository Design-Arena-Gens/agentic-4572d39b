export default function ContactPage() {
  return (
    <div className="stack-xl">
      <h1 className="section-title">Contact</h1>
      <p className="muted" style={{ maxWidth: 72 + 'ch' }}>We'd love to hear from you. Send us a note below and we'll get back to you within 1?2 business days.</p>
      <form className="card" style={{ padding: 20, maxWidth: 560 }}>
        <div className="stack-xl">
          <label>
            <div className="muted" style={{ marginBottom: 8 }}>Name</div>
            <input required name="name" placeholder="Your name" style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--base-2)', outline: 'none', background: 'white' }} />
          </label>
          <label>
            <div className="muted" style={{ marginBottom: 8 }}>Email</div>
            <input required type="email" name="email" placeholder="you@example.com" style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--base-2)', outline: 'none', background: 'white' }} />
          </label>
          <label>
            <div className="muted" style={{ marginBottom: 8 }}>Message</div>
            <textarea required name="message" placeholder="How can we help?" rows={6} style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--base-2)', outline: 'none', background: 'white' }} />
          </label>
          <button className="btn" type="submit" disabled>Send message</button>
          <div className="muted" style={{ fontSize: 12 }}>Note: demo site ? form disabled.</div>
        </div>
      </form>
      
    </div>
  );
}

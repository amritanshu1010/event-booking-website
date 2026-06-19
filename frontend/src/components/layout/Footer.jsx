function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <p className="footer-text">© 2026 EventHub. Discover, book, and manage memorable experiences.</p>
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: 'var(--text-light)' }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Contact Support</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

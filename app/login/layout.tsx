import '../globals.css';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="register-wrapper">
        {children}
      </div>
    )
  }
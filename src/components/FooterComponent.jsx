export function FooterComponent() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="text-center bg-dark text-white p-3">
            <h6 className="m-auto">&copy; {currentYear} React Video Tutorials. All rights reserved.</h6>
        </footer>
    )
}
import "./global.css"

export const metadata = {
    title: "Marcy AI",
    description: "Marcy Labs Study Guide AI"
}

/* Default Layout */
const RootLayout = ({ children }) => {
    return (
        <html>
            <body>{children}</body>
        </html>
    )}

 export default RootLayout
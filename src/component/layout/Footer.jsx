import React from 'react'

const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <footer className="sticky-footer bg-white">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>Copyright © Your Website 2022-{year}</span>
                </div>
            </div>
        </footer>

    )
}

export default Footer
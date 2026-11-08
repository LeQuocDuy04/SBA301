/**
 * Author: Lê Quốc Duy
 * Not found route
 */
import React from 'react';
import {Link} from 'react-router-dom';

export default function NotFound() {
    return <section className="container section narrow">
        <div className="page-title"><span className="eyebrow dark">404</span><h1>Không tìm thấy trang</h1><Link
            className="btn btn-primary" to="/">Về trang chủ</Link></div>
    </section>;
}

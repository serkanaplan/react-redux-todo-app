import React from 'react'

function Footer() {
    return (
        <footer className="info">
            <p>Click to edit a todo</p>
            <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
    )
}

//bu component üzerinde herhangi bir veri manüplasyonu olmadığı için tekrar render edilmesine gerek yok oyüzden memoization ile sarmaladık
export default React.memo(Footer)
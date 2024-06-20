function MSIcon({ name }: React.HTMLProps<HTMLSpanElement> & { name: string }) {
    return (
        <span
            className="material-symbols-outlined"
            aria-hidden="true"
        >
            {name}
        </span>
    )
}

export {
    MSIcon,
}
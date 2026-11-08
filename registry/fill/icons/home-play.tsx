import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HomePlay({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10.0605 2.71C11.1792 1.76 12.8208 1.76 13.9395 2.71L21.049 8.73C21.578 9.28 22 10.15 22 10.93V19C21.999 20.66 20.6565 22 19 22H5C3.3435 22 2.0007 20.66 2 19V10.93C2.0003 10.05 2.3882 9.21 3.0605 8.64L10.0605 2.71ZM10.7246 9.03C10.3765 8.95 9.851 9.06 9.5415 9.18C9.0215 9.52 8.5005 10.22 8.5 10.9V16.1C8.5006 16.8 8.8843 17.41 9.4316 17.75C9.9793 18.08 10.6917 18.13 11.3496 17.7L15.8525 14.72C16.7152 14.14 16.7151 12.86 15.8525 12.28L11.3711 9.32L11.3604 9.31C11.3589 9.31 11.3569 9.31 11.3545 9.31L11.3496 9.3L11.2393 9.24L11.2275 9.23L11.1045 9.16L11.0869 9.16L10.9102 9.09L10.8994 9.08L10.7246 9.03Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}

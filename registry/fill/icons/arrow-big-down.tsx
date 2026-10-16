import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigDown({ size = 24, ...props }: IconProps) {
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
      <path d="M10.5858 22.4142L3.5858 15.4142C3.2999 15.1283 3.114 14.7699 3.0384 14.3902C2.9629 14.0106 2.9974 13.6082 3.1522 13.2346C3.307 12.861 3.567 12.5521 3.8889 12.337C4.2107 12.122 4.5956 12 5 12L7 12L7 3C7 2.448 7.2249 1.9466 7.5858 1.5858C7.9466 1.2249 8.448 1 9 1L15 1C15.552 1 16.0534 1.2249 16.4142 1.5858C16.7751 1.9466 17 2.448 17 3L17 12L19 12C19.4044 12 19.7893 12.122 20.1111 12.337C20.433 12.5521 20.693 12.861 20.8478 13.2346C21.0026 13.6082 21.0371 14.0106 20.9616 14.3902C20.886 14.7699 20.7001 15.1283 20.4142 15.4142L13.4142 22.4142C13.0239 22.8045 12.5103 23 12 23C11.4897 23 10.9761 22.8045 10.5858 22.4142Z" fill="currentColor"/>
    </svg>
  )
}

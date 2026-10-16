import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigDownShort({ size = 24, ...props }: IconProps) {
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
      <path d="M10.5858 21.4142L1.5858 12.4142C1.2999 12.1283 1.114 11.7699 1.0384 11.3902C0.9629 11.0106 0.9974 10.6082 1.1522 10.2346C1.307 9.861 1.567 9.5521 1.8889 9.337C2.2107 9.122 2.5956 9 3 9L6 9L6 4C6 3.448 6.2249 2.9466 6.5858 2.5858C6.9466 2.2249 7.448 2 8 2L16 2C16.552 2 17.0534 2.2249 17.4142 2.5858C17.7751 2.9466 18 3.448 18 4L18 9L21 9C21.4044 9 21.7893 9.122 22.1111 9.337C22.433 9.5521 22.693 9.861 22.8478 10.2346C23.0026 10.6082 23.0371 11.0106 22.9616 11.3902C22.886 11.7699 22.7001 12.1283 22.4142 12.4142L13.4142 21.4142C13.0239 21.8045 12.5103 22 12 22C11.4897 22 10.9761 21.8045 10.5858 21.4142Z" fill="currentColor"/>
    </svg>
  )
}

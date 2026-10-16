import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigRightShort({ size = 24, ...props }: IconProps) {
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
      <path d="M21.4142 13.4142L12.4142 22.4142C12.1283 22.7001 11.7699 22.886 11.3902 22.9616C11.0106 23.0371 10.6082 23.0026 10.2346 22.8478C9.861 22.693 9.5521 22.433 9.337 22.1111C9.122 21.7893 9 21.4044 9 21L9 18L4 18C3.448 18 2.9466 17.7751 2.5858 17.4142C2.2249 17.0534 2 16.552 2 16L2 8C2 7.448 2.2249 6.9466 2.5858 6.5858C2.9466 6.2249 3.448 6 4 6L9 6L9 3C9 2.5956 9.122 2.2107 9.337 1.8889C9.5521 1.567 9.861 1.307 10.2346 1.1522C10.6082 0.9974 11.0106 0.9629 11.3902 1.0384C11.7699 1.114 12.1283 1.2999 12.4142 1.5858L21.4142 10.5858C21.8045 10.9761 22 11.4897 22 12C22 12.5103 21.8045 13.0239 21.4142 13.4142Z" fill="currentColor"/>
    </svg>
  )
}

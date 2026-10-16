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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M21.4142 13.4142L12.4142 22.4142C12.1283 22.7001 11.7699 22.886 11.3902 22.9616C11.0106 23.0371 10.6082 23.0026 10.2346 22.8478C9.861 22.693 9.5521 22.433 9.337 22.1111C9.122 21.7893 9 21.4044 9 21L9 18L4 18C3.448 18 2.9466 17.7751 2.5858 17.4142C2.2249 17.0534 2 16.552 2 16L2 8C2 7.448 2.2249 6.9466 2.5858 6.5858C2.9466 6.2249 3.448 6 4 6L9 6L9 3C9 2.5956 9.122 2.2107 9.337 1.8889C9.5521 1.567 9.861 1.307 10.2346 1.1522C10.6082 0.9974 11.0106 0.9629 11.3902 1.0384C11.7699 1.114 12.1283 1.2999 12.4142 1.5858L21.4142 10.5858C21.8045 10.9761 22 11.4897 22 12C22 12.5103 21.8045 13.0239 21.4142 13.4142Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M20.7071 12.7071L11.7071 21.7071C11.4211 21.9931 10.991 22.0787 10.6173 21.9239C10.2436 21.7691 10 21.4045 10 21L10 18C10 17.4477 9.5523 17 9 17L4 17C3.4477 17 3 16.5523 3 16L3 8C3 7.4477 3.4477 7 4 7L9 7C9.5523 7 10 6.5523 10 6L10 3C10 2.5955 10.2436 2.2309 10.6173 2.0761C10.991 1.9213 11.4211 2.0069 11.7071 2.2929L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071Z"/>
    </svg>
  )
}

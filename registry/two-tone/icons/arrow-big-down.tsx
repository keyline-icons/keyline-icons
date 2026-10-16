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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10.5858 22.4142L3.5858 15.4142C3.2999 15.1283 3.114 14.7699 3.0384 14.3902C2.9629 14.0106 2.9974 13.6082 3.1522 13.2346C3.307 12.861 3.567 12.5521 3.8889 12.337C4.2107 12.122 4.5956 12 5 12L7 12L7 3C7 2.448 7.2249 1.9466 7.5858 1.5858C7.9466 1.2249 8.448 1 9 1L15 1C15.552 1 16.0534 1.2249 16.4142 1.5858C16.7751 1.9466 17 2.448 17 3L17 12L19 12C19.4044 12 19.7893 12.122 20.1111 12.337C20.433 12.5521 20.693 12.861 20.8478 13.2346C21.0026 13.6082 21.0371 14.0106 20.9616 14.3902C20.886 14.7699 20.7001 15.1283 20.4142 15.4142L13.4142 22.4142C13.0239 22.8045 12.5103 23 12 23C11.4897 23 10.9761 22.8045 10.5858 22.4142Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11.2929 21.7071L4.2929 14.7071C4.0069 14.4211 3.9213 13.991 4.0761 13.6173C4.2309 13.2436 4.5955 13 5 13L7 13C7.5523 13 8 12.5523 8 12L8 3C8 2.4477 8.4477 2 9 2L15 2C15.5523 2 16 2.4477 16 3L16 12C16 12.5523 16.4477 13 17 13L19 13C19.4045 13 19.7691 13.2436 19.9239 13.6173C20.0787 13.991 19.9931 14.4211 19.7071 14.7071L12.7071 21.7071C12.3166 22.0976 11.6834 22.0976 11.2929 21.7071Z"/>
    </svg>
  )
}

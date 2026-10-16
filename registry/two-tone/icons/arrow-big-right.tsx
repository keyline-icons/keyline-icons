import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ArrowBigRight({ size = 24, ...props }: IconProps) {
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
      <path d="M22.4142 13.4142L15.4142 20.4142C15.1283 20.7001 14.7699 20.886 14.3902 20.9616C14.0106 21.0371 13.6082 21.0026 13.2346 20.8478C12.861 20.693 12.5521 20.433 12.337 20.1111C12.122 19.7893 12 19.4044 12 19L12 17L3 17C2.448 17 1.9466 16.7751 1.5858 16.4142C1.2249 16.0534 1 15.552 1 15L1 9C1 8.448 1.2249 7.9466 1.5858 7.5858C1.9466 7.2249 2.448 7 3 7L12 7L12 5C12 4.5956 12.122 4.2107 12.337 3.8889C12.5521 3.567 12.861 3.307 13.2346 3.1522C13.6082 2.9974 14.0106 2.9629 14.3902 3.0384C14.7699 3.114 15.1283 3.2999 15.4142 3.5858L22.4142 10.5858C22.8045 10.9761 23 11.4897 23 12C23 12.5103 22.8045 13.0239 22.4142 13.4142Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M21.7071 12.7071L14.7071 19.7071C14.4211 19.9931 13.991 20.0787 13.6173 19.9239C13.2436 19.7691 13 19.4045 13 19L13 17C13 16.4477 12.5523 16 12 16L3 16C2.4477 16 2 15.5523 2 15L2 9C2 8.4477 2.4477 8 3 8L12 8C12.5523 8 13 7.5523 13 7L13 5C13 4.5955 13.2436 4.2309 13.6173 4.0761C13.991 3.9213 14.4211 4.0069 14.7071 4.2929L21.7071 11.2929C22.0976 11.6834 22.0976 12.3166 21.7071 12.7071Z"/>
    </svg>
  )
}

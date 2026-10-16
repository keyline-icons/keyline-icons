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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M22.4142 13.4142L15.4142 20.4142C15.1283 20.7001 14.7699 20.886 14.3902 20.9616C14.0106 21.0371 13.6082 21.0026 13.2346 20.8478C12.861 20.693 12.5521 20.433 12.337 20.1111C12.122 19.7893 12 19.4044 12 19L12 17L3 17C2.448 17 1.9466 16.7751 1.5858 16.4142C1.2249 16.0534 1 15.552 1 15L1 9C1 8.448 1.2249 7.9466 1.5858 7.5858C1.9466 7.2249 2.448 7 3 7L12 7L12 5C12 4.5956 12.122 4.2107 12.337 3.8889C12.5521 3.567 12.861 3.307 13.2346 3.1522C13.6082 2.9974 14.0106 2.9629 14.3902 3.0384C14.7699 3.114 15.1283 3.2999 15.4142 3.5858L22.4142 10.5858C22.8045 10.9761 23 11.4897 23 12C23 12.5103 22.8045 13.0239 22.4142 13.4142Z" fill="currentColor"/>
    </svg>
  )
}

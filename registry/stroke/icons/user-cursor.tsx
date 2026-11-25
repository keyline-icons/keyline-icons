import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M9 4C10.6569 4 12 5.3431 12 7C12 8.6569 10.6569 10 9 10C7.3432 10 6 8.6569 6 7C6 5.3431 7.3432 4 9 4ZM10 21L3 21C2.4477 21 2 20.5523 2 20C2 16.6863 4.6863 14 8 14L10 14M16.3636 20.7825L14.0152 13.4061C13.9379 13.1634 14.1688 12.9356 14.4104 13.0161L21.7865 15.4719C22.0599 15.5629 22.0736 15.9444 21.8075 16.0548L18.6567 17.362C18.5847 17.3919 18.5265 17.4475 18.4934 17.518L16.9447 20.8204C16.8239 21.0779 16.4499 21.0535 16.3636 20.7825Z"/>
    </svg>
  )
}

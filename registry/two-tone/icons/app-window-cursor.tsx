import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AppWindowCursor({ size = 24, ...props }: IconProps) {
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
      <path d="M15.3636 20.7825L13.0152 13.4061C12.9379 13.1634 13.1688 12.9356 13.4104 13.0161L20.7865 15.4719C21.0599 15.5629 21.0736 15.9444 20.8075 16.0548L17.6567 17.362C17.5847 17.3919 17.5265 17.4475 17.4934 17.518L15.9447 20.8204C15.8239 21.0779 15.4499 21.0535 15.3636 20.7825Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11 21H6C4.34315 21 3 19.6569 3 18V6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V11M15.3636 20.7825L13.0152 13.4061C12.9379 13.1634 13.1688 12.9356 13.4104 13.0161L20.7865 15.4719C21.0599 15.5629 21.0736 15.9444 20.8075 16.0548L17.6567 17.362C17.5847 17.3919 17.5265 17.4475 17.4934 17.518L15.9447 20.8204C15.8239 21.0779 15.4499 21.0535 15.3636 20.7825Z"/>
      <path d="M8 7C8 7.5523 7.5523 8 7 8C6.4477 8 6 7.5523 6 7C6 6.4477 6.4477 6 7 6C7.5523 6 8 6.4477 8 7ZM12 7C12 7.5523 11.5523 8 11 8C10.4477 8 10 7.5523 10 7C10 6.4477 10.4477 6 11 6C11.5523 6 12 6.4477 12 7ZM16 7C16 7.5523 15.5523 8 15 8C14.4477 8 14 7.5523 14 7C14 6.4477 14.4477 6 15 6C15.5523 6 16 6.4477 16 7Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}

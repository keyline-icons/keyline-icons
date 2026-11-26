import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileSignature({ size = 24, ...props }: IconProps) {
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
      <path d="M14 1C14.2652 1 14.5195 1.1054 14.707 1.293L20.707 7.293C20.8946 7.4805 21 7.7348 21 8L21 18C21 20.7614 18.7614 23 16 23L8 23C5.2386 23 3 20.7614 3 18L3 6C3 3.2386 5.2386 1 8 1Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M20 8L14 2M14 2L14 5C14 6.6569 15.3431 8 17 8L20 8M8 13.7228C10.1818 13.2431 10.4242 11.324 10.6666 12.2835C10.9091 13.2431 11.3939 14.2026 12.1212 13.9627C12.8485 13.7228 13.0909 12.5234 13.5757 13.2431C14.0606 13.9627 15.2728 13.9627 16 13.9627M8 18L16 18"/>
    </svg>
  )
}

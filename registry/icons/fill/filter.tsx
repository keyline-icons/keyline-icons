import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Filter({ size = 24, ...props }: IconProps) {
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
      <path d="M2.5786 5.405C2.012 4.831 1.8457 3.9728 2.1567 3.2286C2.4678 2.4845 3.1954 2 4.002 2L19.998 2C20.8046 2 21.5322 2.4845 21.8433 3.2286C22.1543 3.9728 21.988 4.831 21.4214 5.405L15 11.9104L15 18.4997C15 19.1296 14.7033 19.7226 14.1992 20.1003L12.1992 21.5988C11.5931 22.0529 10.7825 22.1257 10.1051 21.7868C9.4278 21.448 9 20.7556 9 19.9982L9 11.9104Z" fill="currentColor"/>
    </svg>
  )
}

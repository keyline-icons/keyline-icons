import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Ruler({ size = 24, ...props }: IconProps) {
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
      <path d="M4.9289 13.414L7.7574 16.243M7.7574 10.586L9.5251 12.354M10.5858 7.757L13.4142 10.586M13.4142 4.929L15.182 6.697M2.5858 18.586C1.8047 17.805 1.8047 16.538 2.5858 15.757L15.7573 2.586C16.5384 1.805 17.8047 1.805 18.5858 2.586L21.4142 5.414C22.1953 6.195 22.1953 7.462 21.4142 8.243L8.2427 21.414C7.4616 22.195 6.1953 22.195 5.4142 21.414L2.5858 18.586Z"/>
    </svg>
  )
}

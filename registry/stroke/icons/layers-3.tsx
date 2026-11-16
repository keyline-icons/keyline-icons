import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Layers3({ size = 24, ...props }: IconProps) {
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
      <path d="M18.7611 9.75L21.4382 11.082C22.1873 11.455 22.1873 12.545 21.4382 12.918L18.7611 14.25L12.4382 17.397C12.1616 17.534 11.8384 17.534 11.5618 17.397L5.2389 14.25L2.5618 12.918C1.8127 12.545 1.8127 11.455 2.5618 11.082L5.2389 9.75M18.7611 9.75L14.2402 12L12.4382 12.897C12.1616 13.034 11.8384 13.034 11.5618 12.897L9.7599 12L5.2389 9.75L2.5619 8.418C1.8128 8.045 1.8128 6.955 2.5619 6.582L11.5618 2.103C11.8384 1.966 12.1616 1.966 12.4382 2.103L21.4382 6.582C22.1873 6.955 22.1873 8.045 21.4382 8.418L18.7611 9.75ZM5.2389 14.25L2.5619 15.582C1.8128 15.955 1.8128 17.045 2.5619 17.418L11.5618 21.897C11.8384 22.034 12.1616 22.034 12.4382 21.897L21.4382 17.418C22.1873 17.045 22.1873 15.955 21.4382 15.582L18.7611 14.25"/>
    </svg>
  )
}

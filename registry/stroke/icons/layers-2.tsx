import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Layers2({ size = 24, ...props }: IconProps) {
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
      <path d="M9.7599 12L2.5618 15.582C1.8127 15.955 1.8127 17.045 2.5618 17.418L11.5618 21.897C11.8384 22.034 12.1616 22.034 12.4382 21.897L21.4382 17.418C22.1873 17.045 22.1873 15.955 21.4382 15.582L14.2401 12M14.2401 12L12.4382 12.897C12.1616 13.034 11.8384 13.034 11.5618 12.897L9.7599 12L2.5618 8.418C1.8127 8.045 1.8127 6.955 2.5618 6.582L11.5618 2.103C11.8384 1.966 12.1616 1.966 12.4382 2.103L21.4381 6.582C22.1872 6.955 22.1872 8.045 21.4381 8.418L14.2401 12Z"/>
    </svg>
  )
}

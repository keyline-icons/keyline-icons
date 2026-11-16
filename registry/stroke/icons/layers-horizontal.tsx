import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LayersHorizontal({ size = 24, ...props }: IconProps) {
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
      <path d="M12.625 2L17.2864 11.562C17.4212 11.838 17.4212 12.162 17.2864 12.438L12.625 22M17.2375 2L21.8989 11.562C22.0337 11.838 22.0337 12.162 21.8989 12.438L17.2375 22M2.1011 12.438L6.4886 21.438C6.8538 22.187 7.9212 22.187 8.2864 21.438L12.6739 12.438C12.8087 12.162 12.8087 11.838 12.6739 11.562L8.2864 2.562C7.9212 1.813 6.8538 1.813 6.4886 2.562L2.1011 11.562C1.9663 11.838 1.9663 12.162 2.1011 12.438Z"/>
    </svg>
  )
}

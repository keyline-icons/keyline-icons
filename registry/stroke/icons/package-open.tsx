import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PackageOpen({ size = 24, ...props }: IconProps) {
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
      <path d="M12 13.2413L8.6286 15.8557C8.3247 16.0914 7.9126 16.1319 7.5686 15.9599L2.5529 13.4521C1.8942 13.1228 1.8054 12.2187 2.3873 11.7674L5 9.7413L12 6.2413L15.0408 2.3813C15.3343 2.0086 15.8493 1.8935 16.2735 2.1056L21.447 4.6924C22.0136 4.9757 22.1774 5.7079 21.7853 6.2056L19 9.7413L19 18C19 18.3788 18.786 18.725 18.4472 18.8944L12.4472 21.8944C12.1657 22.0352 11.8343 22.0352 11.5528 21.8944L5.5528 18.8944C5.214 18.725 5 18.3788 5 18L5 14.6756M5 9.7413L12 13.2413L19 9.7413M12 13.2413L12 22M12 6.2413L19 9.7413" fill="none"/>
    </svg>
  )
}
